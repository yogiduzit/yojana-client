export const workPackageSorter = (wp1, wp2) => {
    const id1 = wp1.id.substring(2);
    const id2 = wp2.id.substring(2);
    const lesser = (id1.length > id2.length) ? id1.length : id2.length;

    for (let i = 0; i < lesser; i += 2) {
        if (id1.charAt(i) === id2.charAt(i)) continue;
        if (id1.charAt(i) < id2.charAt(i)) {
            return -1;
        } else {
            return 1;
        }
    }
    return 0;
}