$(document).ready(function() {
    let charactersData = [];

    function fetchCharacterData() {
        const randomGen = Math.ceil(Math.random() * 88);
        $.get(`https://akabab.github.io/starwars-api/api/id/${randomGen}.json`, function(data) {
            charactersData.push(data);
            updateCharacterDisplay(data);
        });
    }

    function updateCharacterDisplay(data) {
        $("h5.name").text(data['name']);
        $(".char-img").attr("src", data['image']);
        $("li:contains('Height')").html(`<i>Height: ${data['height']}<i>`);
        $("li:contains('Gender')").html(`<i>Gender: ${data['gender']}<i>`);
        $("li:contains('Eye Color')").html(`<i>Eye Color: ${data['eyeColor']}<i>`);
        $("li:contains('Species')").html(`<i>Species: ${data['species']}<i>`);
        $("li:contains('Hair Color')").html(`<i>Hair Color: ${data['hairColor']}<i>`);
      
        if (data['wiki']) {
            $(".more-info").data("wiki", data['wiki']);
            console.log("Wiki link set: ", data['wiki']);
        } else {
            console.error("Wiki link not found in the data.");
            $(".more-info").data("wiki", ""); 
        }

        console.log(data);
    }

    $(".randomB").on("click", fetchCharacterData);

    $(".more-info").on("click", function() {
        const wikiLink = $(this).data("wiki");
        if (wikiLink) {
            window.location.href = wikiLink;
        } else {
            console.error("Wiki link not available.");
            alert("Link not available")
        }
    });

    $("#search-btn").on("click", function() {
        const searchTerm = $("#search-input").val().toLowerCase();
        const character = charactersData.find(char => char.name.toLowerCase().includes(searchTerm));

        if (character) {
            updateCharacterDisplay(character);
        } else {
            alert("Character not found in the data.");
        }
    });
});

//© Clarence Claude Cristobal