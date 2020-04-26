// alot of work to get notes to be saved and add the info to
$(document).ready(function () {

    const articleContainer = $(".article-container");
// some buttons to run the functions on this page to Delete, save Notes and articles
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=true").then(function (data) {
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        let articlePanels = [];
        for (let i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        let panel = $(
            [
                "<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                "<a class='article-link' target='_blank' href='" + article.url + "'>",
                article.headline,
                "</a>",
                "<a class='btn btn-danger delete'>",
                "Delete From Saved",
                "</a>",
                "<a class='btn btn-info notes'>Article Notes</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"
            ].join("")
        );
        panel.data("_id", article._id);
        return panel;
    }

    function renderEmpty() {
        let emptyAlert = $(
            [
                "<div class='alert alert-warning text-center'>",
                "<h4>Uh Oh. Looks like we don't have any saved articles.</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>Would You Like to Browse Available Articles?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a href='/'>Browse Articles</a></h4>",
                "</div>",
                "</div>"
            ].join("")
        );
        articleContainer.append(emptyAlert);
    }

    function renderNotesList(data) {

        //render notes function and set them into an array
        let notesToRender = [];
        let currentNote;
        if (!data.notes.length) {
            currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
            notesToRender.push(currentNote);
        }
        else {
            for (let i = 0; i < data.notes.length; i++) {
                currentNote = $(
                    [
                        "<li class='list-group-item note'>",
                        data.notes[i].noteText,
                        "<button class='btn btn-danger note-delete'>x</button>",
                        "</li>"
                    ].join("")
                );
                currentNote.children("button").data("_id", data.notes[i]._id);
                notesToRender.push(currentNote);
            }
        }
        $(".note-container").append(notesToRender);
    }

    function handleArticleDelete() {
        var articleToDelete = $(this).parents(".panel").data();
        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + articleToDelete._id
        }).then(function (data) {
            if (data.ok) {
                initPage();
            }
        });
    }

    function handleArticleNotes() {
        let currentArticle = $(this).parents(".panel").data();
        $.get("/api/notes/" + currentArticle._id).then(function (data) {
            let modalText = [
                "<div class='container-fluid text-center'>",
                "<h4>Notes For Article: ",
                currentArticle._id,
                "</h4>",
                "<hr />",
                "<ul class='list-group note-container'>",
                "</ul>",
                "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
                "<button class='btn btn-success save'>Save Note</button>",
                "</div>"
            ].join("");
            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            let noteData = {
                _id: currentArticle._id,
                notes: data || []
            };
            $(".btn.save").data("article", noteData);
            renderNotesList(noteData);
        });
    }

    function handleNoteSave() {

        // time to save a new note to an articles, grab  the note that was typed in the box
        let noteData;
        let newNote = $(".bootbox-body textarea").val().trim();
        if (newNote) {
            noteData = {
                _id: $(this).data("article")._id,
                noteText: newNote
            };
            $.post("/api/notes", noteData).then(function () {
                // hide the box after complete
                bootbox.hideAll();
            });
        }
    }

    function handleNoteDelete() {
        let noteToDelete = $(this).data("_id");
        $.ajax({
            url: "/api/notes/" + noteToDelete,
            method: "DELETE"
        }).then(function () {
            // hiding the box when we need it to
            bootbox.hideAll();
        });
    }
});