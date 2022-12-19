const { Thought, User } = require('../models');


const thoughtController = { 
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.Id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json({ message: `Thought created successfully!` });
            })
            .catch(err => res.json(err));
            
        },
        
        updateThought({ params, body }, res) {
            Thought.findOneAndUpdate({ _id:
                params.id }, body, { new: true, runValidators: true })
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        res.status(404).json({ message: 'No thought found with this id.' });
                        return;
                    }
                    res.json(dbThoughtData);
                }
                )
                .catch(err => res.status(400).json(err));
            },
            
            addReaction({ params, body }, res) {
                Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { reactions: body } },
                    { new: true, runValidators: true }
                    )
                    .then(dbThoughtData => {
                        if (!dbThoughtData) {
                            res.status(404).json({ message: 'Thought found with this id!' });
                            return;
                        }
                        res.json(dbThoughtData);
                    })
                    .catch(err => res.json(err));
                },
                
                deleteReaction({ params }, res) {   
                    Thought.findOneAndUpdate(
                        { _id: params.id },
                        { $pull: { reactions: { reactionId: params.reactionId } } },
                        { new: true }
                        )
                        .then(dbThoughtData => res.json(dbThoughtData))
                        .catch(err => res.json(err));
                    },
                    
                    
                    deleteThought({ params }, res) {
                        Thought.findOneAndDelete({ _id: params.id })
                        .then(deletedThought => {
                            if (!deletedThought) {
                                return res.status(404).json({ message: 'No thoughtfound with this id.' });
                            }
                            return User.findOneAndUpdate(
                                { thoughts: params.id },
                                { $pull: { thoughts: params.id } },
                                { new: true }
                                );
                            }
                            )
                            .then(dbUserData => {
                                if (!dbUserData) {
                                    res.status(404).json({ message: 'No user found with this id.' });
                                    return;
                                }
                                res.json(dbUserData);
                            }
                            )
                            .catch(err => res.json(err));
                        }
                        
                    };
module.exports = thoughtController;