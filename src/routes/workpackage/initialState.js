export const initialProjectState = {
    "audit": {
        "createdAt": 0,
        "updatedAt": 0
    },
    "id": "",
    "name": "",
    "budget": 0.0,
    "allocatedBudget": 0.0,
    "initialEstimate": 0.0,
    "allocatedInitialEstimate": 0.0,
    "description": "",
    "status": "pending",
    "projectManager": {
        "audit": {
            "createdAt": 0,
            "updatedAt": 0
        },
        "id": 0,
        "fullName": "",
        "labourGradeId": "",
        "creatorId": null,
        "managerId": null,
        "timesheetApproverId": null,
        "projectManager": true,
        "hr": true,
        "admin": true
    },
    "projectManagerId": 0
};

export const initialWorkPackageState = {
    "audit": {
        "createdAt": 0,
        "updatedAt": 0
    },
    "workPackagePk": {
        "id": "",
        "projectID": ""
    },
    "parentWPId": "",
    "workPackageName": "",
    "description": "",
    "budget": 0.0,
    "allocatedBudget": 0.0,
    "initialEstimate": 0.0,
    "allocatedInitialEstimate": 0.0,
    "charged": 0.0,
    "costAtCompletion": 0.0,
    "dueAt": 0,
    "status": "open",
    "hierarchyLevel": 0,
    "lowestLevel": null
};