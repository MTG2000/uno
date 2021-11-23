
import os

path = '.'

files = os.listdir(path)

for f in files:
	print('"{}",'.format(f))