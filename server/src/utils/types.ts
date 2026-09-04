import { t } from "elysia";

import { TypeError, GDError, GDAccountError } from "@server/utils/errors";

export const username = t.String({
    minLength: 3,
    maxLength: 15,
    error({ errors }) {
        const error = errors[0]; if (!error) return GDError.Generic;

        if (error.type === TypeError.StringTooShort) return GDAccountError.UsernameTooShort;
        if (error.type === TypeError.StringTooLong) return GDAccountError.UsernameTooLong;

        return GDError.Generic;
    }
});