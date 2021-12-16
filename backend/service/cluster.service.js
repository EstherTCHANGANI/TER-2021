import mongoService from "./mongo.service";
import _ from "lodash";

const baseClusters = ["evenement", "lieu", "personnalite", "illustration"];

class ClusterService {


    /**
     * 
     * @param {string} path 
     */
    async getTree(path) {
        const jsonPath = path.split("/")
            .filter(el => !_.isEmpty(el))
            .slice(1);
        console.log(jsonPath);

        const events = await this.getEvents();

        if (_.isEmpty(jsonPath)) {
            return baseClusters;
        }

        const clusterType = _.lowerCase(jsonPath[0]);

        if (jsonPath.length === 1) {
            return _.uniq(events.map(event => event[clusterType]))
                .map(e => ({
                    cluster: e,
                    count: events.filter(event => event[clusterType] === e).length
                }));
        } else if (jsonPath.length === 2) {
            const clusterName = _.lowerCase(jsonPath[1]);
            return _.uniq(events.filter(event => _.lowerCase(event[clusterType]) === clusterName)
                .map(event => event.evenement))
                .map(e => ({
                    cluster: e,
                    count: events.filter(event => event.evenement === e).length
                }))
        } else if (jsonPath.length === 3) {
            const evenementName = _.lowerCase(jsonPath[2])
            return events.filter(event => _.lowerCase(event.evenement) === evenementName);
        } else {
            return []
        }
    }


    async getEvents() {
        return await mongoService
            .getCollection("fiches_event")
            .find()
            .toArray();
    }


    /**
     * 
     * @param {string[]} clusters 
     * @param {string[]} keywords 
     * @returns 
     */
    async getAllEvents(clusters, keywords) {
        const events = await this.getEvents();

        if (_.isEmpty(clusters) || _.isEmpty(keywords)) {
            return this.groupEvents(events)
        }

        const filteredEvents = events.filter(event =>
            keywords.every(keyword => this.findKeywordInCluster(event, clusters, _.lowerCase(keyword)))
        );
        return this.groupEvents(filteredEvents)
    }

    async groupEvents(events) {
        console.log(_.groupBy(events, "id"))
        return Object.values(_.groupBy(events, "id"))
        .map(group => group.reduce((res, cur)=> {
            res.images.push(cur.image);
            return res;
        }, {...group[0], images: [group[0].image]}))
    }

    /**
     * 
     * @param {string[]} clusters 
     * @param {string[]} keywords 
     * @returns 
     */
    async groupByEvent(clusters, keywords) {
        const events = await this.getAllEvents(clusters, keywords)

        return this.groupByEvents(events);
    }

    findKeywordInCluster(event, clusters, keyword) {
        return clusters.find(cluster => {
            const value = event[cluster];
            if (_.isUndefined(value) || _.isEmpty(value)) {
                return false;
            }
            if (_.isArray(value)) {
                return value.map(_.lowerCase).find(el => el.includes(keyword))
            } else {
                return _.lowerCase(value).includes(keyword)
            }
        })
    }

    groupByEvents(events) {
        const groupedEvents = _.groupBy(events, "evenement");
        Object.entries(groupedEvents)
            .forEach(([key, value]) => {
                groupedEvents[key] = _.groupBy(value, "titre");
            });
        return groupedEvents;
    }

    async getAllClusters() {
        const events = await this.getEvents();
        return _.uniqWith(_.flattenDeep(events.map(event => {
            return baseClusters.map((cluster) => {
                const value = event[cluster];
                if (_.isArray(value)) {
                    return value.map(el => ({ type: cluster, value: el }))
                } else {
                    return [{ type: cluster, value }]
                }
            })
        })), (e1, e2) => {return e1.type === e2.type && e1.value === e2.value})
    }
}

export default new ClusterService();
