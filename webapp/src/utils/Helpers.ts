export function hashString(s: string | undefined): number {
    if (s === undefined) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash += 31 * hash + s.charCodeAt(i);
    }
    return hash
}

export function cleanAndLowercase(inputString: string) {
    const cleanedString = inputString.replace(/[^a-zA-Z0-9]/g, '');
    const lowercaseString = cleanedString.toLowerCase();
    return lowercaseString;
}