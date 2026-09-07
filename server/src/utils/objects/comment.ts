import { accountComments } from "@server/db/schema";
import { relativeTimestamp } from "@server/utils/text";

export function createAccountCommentObject(comment: typeof accountComments.$inferInsert) {
    const map: ObjectMap[]  = [
        { key: 2, value: comment.comment },
        { key: 4, value: comment.likes },
        { key: 5, value: comment.dislikes },
        { key: 6, value: comment.comment_id },
        { key: 8, value: comment.account_id },
        { key: 9, value: relativeTimestamp(comment.posted_at!) }
    ];

    let response = "";

    map.forEach(data => response += `${data.key}~${data.value}~`);

    response = response.slice(0, -1); // remove last ~

    return response;
}