const formatFollow = (follow) => {
    if (follow) {
        if (follow < 1000) {
            return `${follow} quan tâm`;
        }
        else if (follow < 1000000) {
            return `${Math.floor(follow / 1000)}K quan tâm`;
        }
        else {
            return `${Math.floor(follow / 1000000)}M quan tâm`;
        }
    }
}

export default formatFollow;