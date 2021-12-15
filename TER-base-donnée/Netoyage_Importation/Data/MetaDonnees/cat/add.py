
f = open("merged.csv", "r")
lines = f.read().split("\n") # "\r\n" if needed

for line in lines:
    if line != "":
        # add other needed checks to skip titles
        cols = line.split(",")
        print(cols)
