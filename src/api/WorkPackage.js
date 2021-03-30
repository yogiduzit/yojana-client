import { ACCESS_TOKEN, API_URL } from "../constants/environementVariables"

export const fetchAllWorkPackages = async (id) => {
  const res = await fetch(`${API_URL}/projects/${id}/workPackages`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
  });
  return res.json();    
};

export const fetchWorkPackagesByHierarchy = async (id, hierarchyLevel) => {
  const res = await fetch(`${API_URL}/projects/${id}/workPackages?hierarchyLevel=${hierarchyLevel}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
  });
  return res.json();    
};

export const fetchChildWorkPackages = async (id, wpId) => {
  const res = await fetch(`${API_URL}/projects/${id}/workPackages/${wpId}/children`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
  });
  return res.json();    
};