function isProfName(name) {
    return name.includes(",");
}

function formatProfessor(professor) {
    let splitProfessor = professor.split(" ");
    if (splitProfessor.length === 3) {
        const firstName = splitProfessor[0];
        const lastName = splitProfessor[1];
        professor = `${firstName} ${lastName}`;
    }
    return professor;
}

const elementsWithProfessorNames = () => {
    const elementsWithClassName = document.getElementsByClassName(
        "sis-nounderline"
    );

    return Array.from(elementsWithClassName).filter((professor) => {
        professor.includes(",");
    });
};

const mapUnmatchedProfessors = () => {
    if (UNMATCHED_PROFESSORS[professor]) {
        return (professor = UNMATCHED_PROFESSORS[professor]);
    }
    return "not found";
};

const insertProfessorRatings = () => {
    const elementsWithLinks = document.getElementsByClassName(
        "sis-nounderline"
    );

    const elementsWithProfessorNames = Array.from(elementsWithLinks).filter(
        (element) => {
            return element.innerText.includes(",");
        }
    );

    for (let i = 0; i < elementsWithProfessorNames.length; i++) {
        let professor = elementsWithProfessorNames[i].innerText;

        professor = formatProfessor(professor);

        if (!RATE_MY_PROFESSOR_DATA[professor]) {
            professor = UNMATCHED_PROFESSORS[professor] || professor;
        }

        if (RATE_MY_PROFESSOR_DATA[professor]) {
            elementsWithProfessorNames[
                i
            ].innerText = `${professor} (${RATE_MY_PROFESSOR_DATA[professor].rating})`;
            elementsWithProfessorNames[
                i
            ].href = `https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${RATE_MY_PROFESSOR_DATA[professor].id}`;
            elementsWithProfessorNames[i].target = "_blank";
        }
    }
};

const SEARCH_BUTTON = document.getElementsByName("searchbutton")[0];

const onSearchButtonClick = () => {
    const coursesAreLoaded = () => {
        paragraphElement.innerText = "Loading Professors Ratings ...";
        paragraphElement.className = "sis-flash sis-flash-primary";
        if (!SEARCH_BUTTON.disabled) {
            paragraphElement.className = "sis-flash sis-flash-success";
            paragraphElement.innerText =
                "Professors ratings succesfully Loaded! Email nelson67@stolaf.edu to report an issue, Thanks!";
            // Stop checking if courses are loaded when courses are loaded
            clearInterval(coursesAreLoadedInterval);
            insertProfessorRatings();
        }
    };

    // Check if courses are loaded every second
    const coursesAreLoadedInterval = setInterval(coursesAreLoaded, 100);
};

SEARCH_BUTTON.addEventListener("click", onSearchButtonClick);

const form = document.getElementsByTagName("form")[0];
const paragraphElement = document.createElement("P");
const paragraphTextNode = document.createTextNode("");
paragraphElement.appendChild(paragraphTextNode);
form.appendChild(paragraphElement);
