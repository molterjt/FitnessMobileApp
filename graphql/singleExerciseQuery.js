import gql from "graphql-tag";


const EXERCISE_QUERY = gql`
    query SingleExercise($id: ID!){
        Exercise(id: $id) {
            id
            name
            exerciseId
            description
            sets
            reps
            intensity
            tempo
            imageUrl
        }
    }
`

export default EXERCISE_QUERY;