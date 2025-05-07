// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  //structure data to array of obejects

const today = new Date();
const validAssignments = [];

for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
    let assignmentDueDate = new Date(AssignmentGroup.assignments[i].due_at);
    if (assignmentDueDate <= today) {
        validAssignments.push(AssignmentGroup.assignments[i]); // Add to valid assignments
    }
}

console.log(validAssignments);

  
  
let learnerScore = {}; // Object to store learner ID and scores

let j = 0;
while (j < LearnerSubmissions.length) {
    let submission = LearnerSubmissions[j]; // Declare submission inside the loop

    let assignment = null;
    let i = 0;

    // goes over assignments to find the matching one
    while (i < AssignmentGroup.assignments.length) {
        if (AssignmentGroup.assignments[i].id === submission.assignment_id) {
            assignment = AssignmentGroup.assignments[i];
            break; // Stop the loop once a match is found
        }
        i++; // increase index for assignments loop
    }

    console.log(`Learner ID: ${submission.learner_id}, Assignment:`, assignment);

    j++; // Increase outer loop
}



let learnerScores = {};

for (let j = 0; j < LearnerSubmissions.length; j++) { 
    let submission = LearnerSubmissions[j]; 
    let assignment = validAssignments.find(a => a.id === submission.assignment_id); // Use valid assignments

    if (!assignment) continue; // Skip assignments that aren’t due

    if (!learnerScores[submission.learner_id]) {
        learnerScores[submission.learner_id] = { id: submission.learner_id, avg: 0, totalPoints: 0, earnedPoints: 0 };
    }

    let score = submission.submission.score;

 
    // Store the percentage score per assignment
    learnerScores[submission.learner_id][assignment.id] = (score / assignment.points_possible) * 100;

    // // Accumulate points for weighted average 
    learnerScores[submission.learner_id].earnedPoints += score;
    learnerScores[submission.learner_id].totalPoints += assignment.points_possible;
}
Object.values(learnerScores).forEach(learner => {
    learner.avg = (learner.earnedPoints / learner.totalPoints) * 100;

});

console.log(Object.values(learnerScores));









// //final average
// const learnersArray = Object.values(LearnerSubmissions.score); //takes object "learnerScores" and returns an array containing all the values of that object


// for (let i = 0; i < learnersArray.length; i++) {
//     let learner = learnersArray[i];
//     learner.avg = (learner.earnedPoints / learner.totalPoints) * 100;
//     delete learner.totalPoints;
//     delete learner.earnedPoints;
// }




//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];
  
//     return result;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);