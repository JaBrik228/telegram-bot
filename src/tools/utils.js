

export const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}


export const toMessageObj = (fromUserId, id, objectId, text, toUserId = fromUserId) => {
    const currentDate = new Date().toISOString();

    return {
        "created_at":currentDate,
        "from_user_id": fromUserId,
        "id":id,
        "is_read":true,
        "property_id":objectId,
        "text":text,
        "to_user_id":toUserId
    }
}