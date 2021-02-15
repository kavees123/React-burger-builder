export const updateObject = (oldObject, updatedpropterties) => {
    return {
        ...oldObject,
        ...updatedpropterties
    }
}