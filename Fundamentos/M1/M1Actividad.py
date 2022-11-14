#!/usr/bin/env python
# coding: utf-8

# In[194]:


import agentpy as ap

import matplotlib.pyplot as plt
import seaborn as sns
import IPython
import random


# In[195]:


Moves = [
    (-1,-1),(-1,0),(-1,1),
    (0,-1),(0,1),(0,0),
    (1,-1),(1,1),(1,0),
]


# In[200]:


class DirtyRoom(ap.Model):

    def setup(self):
        
        # Agentes
        self.dirt = self.agents = ap.AgentList(self,int((self.p['Dirt density'] * self.p.height * self.p.length)))
        self.robots = ap.AgentList(self, self.p['numAgents'])
        
        # Grid
        self.room = ap.Grid(self, (self.p.height,self.p.length), track_empty=True)
        self.room.add_agents(self.dirt, random=True, empty=True)
        
        # Todos los robots empiezan en la celda [1,1]
        self.room.add_agents(self.robots, [(1,1)] * self.p['numAgents'], random = False, empty = False)
        
        # CONDICIONES
        # 0: Suciedad
        # 1: Robot
        # 2: Limpio
        self.dirt.condition = 0
        self.robots.condition = 1
        
    def step(self):
        
        dirty_cells = self.dirt.select(self.dirt.condition == 0)
        
        for robot in self.robots:
            for neighbor in self.room.neighbors(robot):
                if neighbor.condition == 0:
                    neighbor.condition = 2
                    break;
            else:
                random_move = random.choice(Moves)
                self.room.move_by(robot,random_move)
        
        if len(dirty_cells) == 0:
            self.stop() 


# In[197]:


parameters = { 
    'height': 10, # Altura del grid
    'length': 20, # Ancho del grid
    'numAgents': 5, # Número de agentes
    'Dirt density': 0.3, # Porcentaje de celdas inicialmente sucias
    'steps': 100, # Tiempo máximo de ejecución 
}


# In[201]:


def animation_plot(model, ax):
    attr_grid = model.room.attr_grid('condition')
    color_dict = {0:'#563939', 1:'#2758FF', 2:'#FFFFFF', None:'#FFFFFF'}
    ap.gridplot(attr_grid, ax=ax, color_dict=color_dict, convert=True)
    ax.set_title(f"Simulation of cleaning robot\n"
                 f"Time-step: {model.t}, Clean cells: "
                 f"{len(model.agents.select(model.agents.condition == 2))}")

fig, ax = plt.subplots()
model = DirtyRoom(parameters)
animation = ap.animate(model, fig, ax, animation_plot)
IPython.display.HTML(animation.to_jshtml(fps=15))

