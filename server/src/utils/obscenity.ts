import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";

const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers
});

export function hasObscenity(text: string) {
    return matcher.getAllMatches(text).length > 0;
}