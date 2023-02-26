# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Ticket 1: Create FacilityAgents table in the database**

Create a new table in the database called `FacilityAgents` that will contain the relation between specific Agent and specific Facility. The table should contain the following columns: `facility_id` (foreign key), `agent_id` (foreign key), `custom_agent_id`. The `custom_agent_id` will be the custom id set by the facility for the agent. Add validation to ensure that the `customId` is unique for each Facility and Agent relation.

- Estimated time/effort: 1 hour.

Acceptance Criteria:

- A new table named `FacilityAgents` is created in the database.
- The table has three columns: `facility_id` (foreign key), `agent_id` (foreign key), and `custom_agent_id`.
- The `custom_agent_id` column should allow null values.
- Implement validation to ensure that the custom agent id is unique for each Facility-Agent relation.

**Ticket 2: Update getShiftsByFacility function**

Modify the `getShiftsByFacility` function to include the `custom_agent_id` in the returned metadata about each Agent. Join the `FacilityAgents` table with `Agents` table to retrieve the `custom_agent_id`.

- Estimated time/effort: 1-2 hours.

Acceptance Criteria:

- The function should return the `custom_agent_id` in the metadata about each Agent.
- Tests should be updated to ensure that the `custom_agent_id` is returned correctly.

**Ticket 3: Update generateReport function**

Modify the `generateReport` function to use the `custom_agent_id` in the report. Join the `FacilityAgents` table with `Agents` table to retrieve the `custom_agent_id`.

- Estimated time/effort: 1-2 hours.

Acceptance Criteria:

- The function should use the `custom_agent_id` in the report.
- Tests should be updated to ensure that the `custom_agent_id` is used correctly in the report.

**Ticket 4: Add setAgentCustomId function**

Create a new function called `setAgentCustomId` that takes in the `facilityId`, `agentId`, and `agentCustomId` arguments. The function should insert a new row into the `FacilityAgents` table with the provided facilityId, agentId, and customId values. If a row with the same `facilityId` and `agentId` values already exists, the function should update the existing row with the new `customId` value.

- Estimated time/effort: 2-3 hours.

Acceptance Criteria:

- A new function named `setAgentCustomId` is created.
- The function takes in three arguments: `facilityId`, `agentId`, and `agentCustomId`.
- The function inserts a new row into the `FacilityAgents` table with the provided `facilityId`, `agentId`, and `customId` values. If a row with the same `facilityId` and `agentId` values already exists, the function should update the existing row with the new `customId` value.
- Tests should be added to ensure that the function works correctly.

**Ticket 5: Update the UI to allow Facilities to set custom ids for their Agents**

Add a new input page (or tab) where Facilities can input their own custom id for each Agent. Use `setAgentCustomId` function to set the custom id for the Agent for the Facility.

- Estimated time/effort: 6-8 hours.

Acceptance Criteria:

- A new input page (or tab) is added to the UI where Facilities can input their own custom id for each Agent.
- Tests should be added to ensure that the UI works correctly