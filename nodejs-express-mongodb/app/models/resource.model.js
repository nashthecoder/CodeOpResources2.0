module.exports = mongoose => {
    const Resource = mongoose.model(
        "resource",
        mongoose.Schema(
            {
                topic: String,
                title: String,
                description: String,
                url: String,
                category: String,
                published: Boolean
            },
        )
    );
    return Resource;
}