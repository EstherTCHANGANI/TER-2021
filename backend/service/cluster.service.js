import mongoService from "./mongo.service";
import _ from "lodash";
import { json } from "express";

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
    async groupByEvent(clusters, keywords) {
        const events = await this.getEvents();

        if (_.isEmpty(clusters) || _.isEmpty(keywords)) {
            return this.groupByEvents(events);
        }

        for (let i = 0; i < keywords.length; i++) {
            keywords[i] = _.lowerCase(keywords[i])
        }

        console.log(events)
        const filteredEvent = events.filter(event =>
            keywords.find(keyword => this.findKeywordInCluster(event, clusters, keyword))
        )

        return this.groupByEvents(filteredEvent);
    }

    findKeywordInCluster(event, clusters, keyword) {
        return clusters.find(cluster => {
            if (_.isArray(event[cluster])) {
                return event[cluster].map(_.lowerCase).find(el => el.includes(keyword))
            } else {
                return _.lowerCase(event[cluster]).includes(keyword)
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
}

export default new ClusterService();
