
const api = "https://rhymebrain.com/talk?function=getRhymes"

function getRhymes() {

    document.getElementById("rhymeNode").innerText = "";
    document.getElementById("errorText").innerText = ""

    document.getElementById("rhymeLoading").innerText = "Your Rhyme is Loading..."


    const input = document.getElementById("RhymeBrainInput");
    const url = api + "&word=" + input.value;
    // console.log(url);

    fetch(url).then(
        (resp) => resp.json()
    ).then((data) =>
        insertRhyme(data)
    ).catch((err) => {
        console.log(err);
        handleRhymeError("There was a problem! You can try again or give up.")
    }
    )

}

function insertRhyme(data) {
    let rhymeToShow = null;

    //TODO feature: Add a slider to select the quality of rhymes returned
    if (Array.isArray(data)) {
        dataFiltered = data.filter(
            (elt) => elt.score >= 300
        );

        if (dataFiltered.length > 0) {
            let rhymeIndex = getRndInteger(0, dataFiltered.length - 1);
            rhymeToShow = dataFiltered[rhymeIndex].word;
            // console.log(dataFiltered)[rhymeIndex];

        }
        else {
            handleRhymeError("We couldn't find any rhymes!")
        }
    } else {
        if (data) {
            rhymeToShow = data.word;
        } else handleRhymeError("We couldn't find any rhymes!");

    }
    document.getElementById("rhymeLoading").innerText = "";
    document.getElementById("errorText").innerText = ""
    document.getElementById("rhymeNode").innerText = rhymeToShow;




}

function handleRhymeError(err) {

    document.getElementById("rhymeLoading").innerText = "";
    document.getElementById("rhymeNode").innerText = "";
    document.getElementById("errorText").innerText = err;

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
