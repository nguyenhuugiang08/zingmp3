const formatFollow = (follow) => {
    if (follow) {
        if (follow < 1000) {
            return `${follow}`;
        }
        else if (follow < 1000000) {
            return `${Math.floor(follow / 1000)}K`;
        }
        else {
            return `${(follow / 1000000).toFixed(1)}M`;
        }
    }
}

export default formatFollow;