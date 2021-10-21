<template>
  <div>
    <ul class="workflowToolbox">
      <div v-for="group in this.groups" v-bind:key="group.id">
        <h2>{{group.Name}}</h2>
        <div class="group" v-for="subGroup in group.subGroups" v-bind:key="subGroup.id">
          <h4>{{subGroup.Name}}</h4>
          <WorkflowToolboxItem
            v-for="step in subGroup.steps"
            v-bind:key="step.id"
            v-bind:step="step"
          />
        </div>
      </div>
      <div>
        <h2>Saved</h2>
        <div class="group">
          <WorkflowToolboxItem
            v-for="workflow in this.savedWorkflows"
            v-bind:key="workflow.id"
            v-bind:step="workflow"
          />
        </div>
      </div>
      <div>
        <h2>Samples</h2>
        <div class="group">
          <WorkflowToolboxItem
            v-for="workflow in this.sampleWorkflows"
            v-bind:key="workflow.id"
            v-bind:step="workflow"
          />
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import BaseInputText from "./BaseInputText.vue";
import WorkflowToolboxItem from "./WorkflowToolboxItem.vue";
import { getTimeStamp } from "./DateHelpers";
import { getWorkflowToolboxSteps } from "./FetchDataHelper";

let nextStepId = 1;

export default {
  components: {
    BaseInputText,
    WorkflowToolboxItem
  },
  data() {
    return {
      newStepName: "",
      groups: [
        {
          Name: "Andrews Test",
          subGroups: [
            {
              Name: "Communication steps",
              steps: [
                {
                  id: nextStepId++,
                  type: "SendEmail",
                  Name: "Send email",
                  desc: "Send an email to the user from the server",
                  settings: { template: "Admin end workflow" }
                },
                {
                  id: nextStepId++,
                  type: "SendEmailViaAgent",
                  Name: "Send email via Agent",
                  desc:
                    "Send an email to the user from the on-Prem agent, using a template installed on the agent",
                  settings: {}
                },
                {
                  id: nextStepId++,
                  type: "Wait",
                  Name: "Wait for duration",
                  desc: "Wait for a configurable amount of time to pass",
                  settings: { duration: 250 }
                }
              ]
            }
          ]
        }
      ],
      savedWorkflows: [
        {
          name: "test-1",
          type: "workflow",
          saveDate: "2019/10/10",
          author: "andrew",
          data: {
            centerX: 0,
            centerY: 0,
            scale: 1,
            workflowName: "test-1",
            nodes: [
              {
                id: 1,
                x: 10,
                y: 10,
                step: {
                  type: "SendEmail",
                  name: "Send Email To User",
                  desc: "Brief description of the task",
                  settings: { template: "Admin end workflow" }
                }
              },
              {
                id: 2,
                x: 150,
                y: 140,
                step: {
                  type: "FindGroups",
                  name: "Find Groups for User",
                  desc: "Find adGroups that the current user is a member of",
                  settings: {}
                }
              },
              {
                id: 3,
                x: 350,
                y: 270,
                step: {
                  type: "Wait",
                  name: "Wait for duration",
                  desc: "Wait for a configurable amount of time to pass",
                  settings: { duration: 250 }
                }
              }
            ],
            links: [{ id: 1, from: 1, to: 2 }, { id: 2, from: 2, to: 3 }]
          }
        }
      ],
      sampleWorkflows: []
    };
  },
  mounted() {
    let topLevelGroups = getWorkflowToolboxSteps();

    //this.groups = [];

    for (var groupName in topLevelGroups) {
      let newGroup = {
        Name: groupName,
        subGroups: []
      };

      let group = topLevelGroups[groupName];
      for (var subGroupName in group) {
        let subGroupItems = group[subGroupName];

        let newSubGroup = {
          Name: subGroupName,
          steps: []
        };

        for (var stepName in subGroupItems) {
          let step = subGroupItems[stepName];
          //console.log("step", step);
          newSubGroup.steps.push(step);
        }
        newGroup.subGroups.push(newSubGroup);
      }
      this.groups.push(newGroup);
      console.log(newGroup);
    }
  },
  computed: {
    filteredTools: function() {
      if (this.search === "") return this.groups;

      let filteredGroups = JSON.parse(JSON.stringify(this.groups));

      // const containsDeep = text => value => {
      //   if (!value) return false;
      //   const valueType = typeof value;

      //   if (valueType === "string") {
      //     return value.toLowerCase().indexOf(text.toLowerCase()) > -1;
      //   }
      //   if (Array.isArray(value)) {
      //     return value.some(containsDeep(text));
      //   }
      //   if (valueType === "object") {
      //     return Object.values(value).some(containsDeep(text));
      //   }
      //   return false;
      // };

      // const result = this.groups.filter(containsDeep(this.search));
      // console.log(result);

      let self = this;
      filteredGroups.reverse().forEach(function(group, index, array) {
        group.subGroups.reverse().forEach(function(subGroup, index, array) {
          subGroup.steps.reverse().forEach(function(step, index, array) {
            console.log(
              step,
              step.name.toLowerCase().indexOf(self.search.toLowerCase())
            );
            if (
              step.name.toLowerCase().indexOf(self.search.toLowerCase()) === -1
            ) {
              // remove the step
              console.log("removing", index);
              array.splice(index, 1);
            }
          });
          console.log("steps", subGroup.steps.length);
          if (subGroup.steps.length === 0) {
            console.log("removing", index);
            array.splice(index, 1);
          }
        });
        console.log("subGroups", group.subGroups.length);
        if (group.subGroups.length === 0) {
          console.log("removing", index);
          array.splice(index, 1);
        }
      });
      console.log("filteredGroups", filteredGroups);
      return filteredGroups;
    }
  },
  methods: {
    SaveWorkflow(data) {
      console.log("Saving workflow from toolbox", data);
      let savedWorkflow = {
        name: data.workflowName,
        type: "workflow",
        saveDate: getTimeStamp(),
        author: "andrew",
        data: data
      };

      // check if workflow name already exists...
      var index = this.savedWorkflows.findIndex(function(savedWorkflow) {
        return savedWorkflow.name === data.workflowName;
      });
      console.log("found index", index);

      if (index > 0) {
        this.savedWorkflows.splice(index, 1, savedWorkflow);
        return;
      }

      // otherwise insert a new one
      this.savedWorkflows.push(savedWorkflow);
    },
    DeleteWorkflow(workflowName) {
      console.log("Deleting workflow from toolbox", workflowName);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 2px;
}
.group {
  padding: 2px;
  margin: 4px;
  border: 2px solid $lightGrey;
  border-radius: 5px;
}
</style>