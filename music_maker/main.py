import numpy as np
from IPython.display import Audio
divide = 8760
duration = 40   # 秒
speed=110
pitch=12
music=[]
samples=[]
inf=[[1.0,3,1],[0.5,5,2.09],[0.3,7,3.09],[0.15,9,4.04]] #金属音
music = [[2,0,2],[-5,0,2],[-1,2,0.5],[0,2.5,0.5],[2,3,0.5],[4,3.5,0.5],[2,4,0.5],[0,5,0.5],
[-1,6,1],[-3,7,1],[-1,8,2],[-5,10,0.5],[-3,10.5,0.5],[-1,11,0.5],[1,11.5,0.5],[2,12,0.5],[1,13,1],[0,14,1],[2,15,1],]
for k in range(len(music)):
  music[k]=[1,music[k][0]+pitch,music[k][1]*60/speed,music[k][2]*60/speed]
print(music)
for n in range(int(divide * duration)):
 t = n / divide
 value = 0
 for i in range(len(music)):
    value_ele = 0
    if music[i][2]<=t<music[i][2]+music[i][3]:
      if music[i][0]==1:
       for j in range(len(inf)):
        value_ele=value_ele+inf[j][0]*np.exp(-inf[j][1]*(t-music[i][2]))*np.sin(2*np.pi*440*2**((music[i][1]-3)/12)*inf[j][2]*(t-music[i][2]))
      else:
        value_ele=0
    else:
     value_ele = 0
    value = value + value_ele
 samples.append(value)
Audio(samples, rate=divide)