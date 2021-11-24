import jpype
import asposecells
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from google.colab import files
from asposecells.api import Workbook, SaveFormat

# Create a Workbook object with Excel file's path
data_to_load=files.upload()
workbook =  Workbook("Test/*.xlsx")

# Save XLSX as CSV
workbook.save("("^new_file([1-9]|[1-9][0-9]|1[0-9][0-9]|200).csv$"" , SaveFormat.CSV)

aList=[]
with open(self.filename, 'r') as f:
    reader = csv.reader(f, delimiter=',', quoting=csv.QUOTE_NONE)
    for row in reader:
        aList.append(row)
    # I need to strip the extra white space from each string in the row
    return(aList)