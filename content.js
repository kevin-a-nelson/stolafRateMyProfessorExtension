function formatProfessor(professor) {
    let splitProfessor = professor.split(" ");
    if (splitProfessor.length === 3) {
        const firstName = splitProfessor[0];
        const lastName = splitProfessor[1];
        professor = `${firstName} ${lastName}`;
    }
    return professor;
}

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

const coursesFound = () => {
    const results = document.getElementById("results");
    const resultsText = results.innerText;
    return !resultsText.includes("No classes found");
};

const SEARCH_BUTTON = document.getElementsByName("searchbutton")[0];

// init message
const form = document.getElementsByTagName("form")[0];
const paragraphElement = document.createElement("P");
const paragraphTextNode = document.createTextNode("");
paragraphElement.appendChild(paragraphTextNode);
form.appendChild(paragraphElement);

const setMessageToLoading = () => {
    paragraphElement.innerText = "Loading Professor's Ratings ...";
    paragraphElement.className = "sis-flash sis-flash-primary";
};

const setMessageToSuccess = () => {
    paragraphElement.className = "sis-flash sis-flash-success";
    paragraphElement.innerText =
        "Success! Click on an professor to go to their rate my professor page!";
    const elementsWithLinks = document.getElementsByClassName(
        "sis-nounderline"
    );
};

const setMessageToNothing = () => {
    paragraphElement.className = "";
    paragraphElement.innerText = "";
};

const onSearchButtonClick = () => {
    let intervals = 0;
    const coursesAreLoaded = () => {
        setMessageToLoading();
        if (!SEARCH_BUTTON.disabled) {
            if (coursesFound()) {
                setMessageToSuccess();
                insertProfessorRatings();
            } else {
                setMessageToNothing();
            }
            // Stop checking if courses are loaded when courses are loaded
            clearInterval(coursesAreLoadedInterval);
        }
    };

    // Check if courses are loaded every second
    const coursesAreLoadedInterval = setInterval(coursesAreLoaded, 100);
};

SEARCH_BUTTON.addEventListener("click", onSearchButtonClick);
