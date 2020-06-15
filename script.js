
const api = "https://rhymebrain.com/talk?function=getRhymes"

function getRhymes() {

    document.getElementById("rhymeNode").innerText = "";
    document.getElementById("errorText").innerText = ""

    document.getElementById("rhymeLoading").innerText = "Your Rhyme is Loading..."


    const input = document.getElementById("RhymeBrainInput");
    const url = api + "&word=" + input.value;

    fetch(url).then(
        (resp) => resp.json()
    ).then((data) =>
        insertRhyme(data)
    ).catch((err) => {
        handleRhymeError("There was a problem! You can try again or give up.")
    }
    )

}

function insertRhyme(data) {
    let rhymeToShow = null;
    console.log(data)

    if (Array.isArray(data)) {
        if (data.length > 0) {
            let rhymeIndex = getRndInteger(0, data.length - 1);
            rhymeToShow = data[rhymeIndex].word;
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
    document.getElementById("rhymeNode").innerText = rhymeToShow;
    history.pushState({}, "");




}

function handleRhymeError(err) {

    document.getElementById("rhymeLoading").innerText = "";
    document.getElementById("rhymeNode").innerText = "";
    document.getElementById("errorText").innerText = err;

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
