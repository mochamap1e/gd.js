import { comment } from "@server/db/schema/comment";

export function createCommentObject(commentData: typeof comment.$inferInsert) {
    const map: ObjectMap[]  = [
        { key: 2, value: Buffer.from(comment.comment).toString("base64url") }
    ];

    let response = "";

    map.forEach(data => response += `${data.key}~${data.value}:`);

    return response;
}