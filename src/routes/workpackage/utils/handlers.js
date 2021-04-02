import { updateProject } from '../../../api/Project';
import { updateWorkPackage } from '../../../api/WorkPackage';

export const handleEstimateChanged = async (id, newEstimate, setInitialEstimate, wpId) => {
    if (Number.isNaN(parseInt(newEstimate))) {
        console.error("Only numbers are allowed");
        return;
    }
    const body =  {
        initialEstimate: newEstimate
    };
    let changeEstimateResponse;
    if (wpId) {
        changeEstimateResponse = await updateWorkPackage(id, wpId, body);
    } else {
        changeEstimateResponse = await updateProject(id, body);
    }
    if (changeEstimateResponse.errors && changeEstimateResponse.errors.length > 0) {
        console.error("Error while updating estimate");
    } else {
        setInitialEstimate(newEstimate);
    }
};

export const handleBudgetChanged = async (id, newBudget, setTotalBudget, wpId) => {
    if (Number.isNaN(parseInt(newBudget))) {
        console.error("Only numbers are allowed");
        return;
    }
    const body = {
        budget: newBudget
    };
    let changeBudgetResponse;
    if (wpId) {
        changeBudgetResponse = await updateWorkPackage(id, wpId, body);
    } else {
        changeBudgetResponse = await updateProject(id, body);
    }
    if (changeBudgetResponse.errors && changeBudgetResponse.errors.length > 0) {
        console.error("Error while updating budget");
    } else {
        setTotalBudget(newBudget);
    }
};