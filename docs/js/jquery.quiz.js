/*!
 * jquery-quiz v0.0.1 - A simple jQuery quiz plugin.
 * Copyright (c) 2021 JC Hamill - http://jchamill.github.com/jquery-quiz/
 * License: MIT
 */
! function (z, v) {
    "use strict";
    z.quiz = function (t, e) {
        var o = this;
        o.$el = z(t), o.$el.data("quiz", o), o.options = z.extend(z.quiz.defaultOptions, e);
        var s = o.options.questions,
            i = s.length,
            n = o.options.startScreen,
            u = o.options.startButton,
            r = o.options.homeButton,
            a = o.options.resultsScreen,
            c = o.options.gameOverScreen,
            d = o.options.nextButtonText,
            l = o.options.finishButtonText,
            h = o.options.restartButtonText,
            q = 1,
            p = 0,
            f = !1;
        o.methods = {
            init: function () {
                //hide home button on home
                document.getElementById('quiz-home-btn').style = "display: none;";
                o.methods.setup(), z(v).on("click", u, function (t) {
                    t.preventDefault(), o.methods.start();
                    //start the quiz
                    document.getElementById('quiz-home-btn').style = "display:block;"
                }), z(v).on("click", r, function (t) {
                    t.preventDefault(), o.methods.home();
                    //hide home button on home
                    document.getElementById('quiz-home-btn').style = "display: none;";
                }), z(v).on("click", ".answers a", function (t) {
                    t.preventDefault(), o.methods.answerQuestion(this)
                }), z(v).on("click", "#quiz-next-btn", function (t) {
                    t.preventDefault(), o.methods.nextQuestion()
                }), z(v).on("click", "#quiz-finish-btn", function (t) {
                    t.preventDefault(), o.methods.finish()
                }), z(v).on("click", "#quiz-restart-btn, #quiz-retry-btn", function (t) {
                    t.preventDefault(), o.methods.restart()
                })
            },
            setup: function () {
                var i = "";
                o.options.counter && (i += '<div id="quiz-counter"></div>'), i += '<div id="questions">', z.each(s, function (t, e) {
                    i += '<div class="question-container">', i += '<p class="question">' + e.q + "</p>", i += '<ul class="answers">', z.each(e.options, function (t, e) {
                        i += '<li><a href="#" data-index="' + t + '">' + e + "</a></li>"
                    }), i += "</ul>", i += "</div>"
                }), i += "</div>", 0 === z(a).length && (i += '<div id="' + a.substr(1) + '">', i += '<p id="quiz-results"></p>', i += "</div>"), i += '<div id="quiz-controls">', i += '<p id="quiz-response"></p>', i += '<div id="quiz-buttons">', i += '<a href="#" id="quiz-next-btn">' + d + "</a>", i += '<a href="#" id="quiz-finish-btn">' + l + "</a>", i += '<a href="#" id="quiz-restart-btn">' + h + "</a>", i += "</div>", o.$el.append(i += "</div>").addClass("quiz-container quiz-start-state"), z("#quiz-counter").hide(), z(".question-container").hide(), z(c).hide(), z(a).hide(), z("#quiz-controls").hide(), "function" == typeof o.options.setupCallback && o.options.setupCallback()
            },
            start: function () {
                o.$el.removeClass("quiz-start-state").addClass("quiz-questions-state"), z(n).hide(), z("#quiz-controls").hide(), z("#quiz-finish-btn").hide(), z("#quiz-restart-btn").hide(), z("#questions").show(), z("#quiz-counter").show(), z(".question-container:first-child").show().addClass("active-question"), o.methods.updateCounter()
            },
            answerQuestion: function (t) {
                if (!f) {
                    f = !0;;
                    var e = z(t),
                        i = "",
                        n = e.data("index"),
                        t = q - 1;
                    if (n === s[t].correctIndex) e.addClass("correct"), i = s[t].correctResponse, p++;
                    else if (e.addClass("incorrect"), i = s[t].incorrectResponse, !o.options.allowIncorrect) return void o.methods.gameOver(i);
                    z("#quiz-response").html(i), z("#quiz-controls").fadeIn(), "function" == typeof o.options.answerCallback && o.options.answerCallback(q, n, s[t])
                }
            },
            nextQuestion: function () {
                f = !1, z(".active-question").hide().removeClass("active-question").next(".question-container").show().addClass("active-question"), z("#quiz-controls").hide(), ++q === i && (z("#quiz-next-btn").hide(), z("#quiz-finish-btn").show()), o.methods.updateCounter(), "function" == typeof o.options.nextCallback && o.options.nextCallback()
            },
            gameOver: function (t) {
                var e;
                0 === z(c).length && (e = "", e += '<div id="' + c.substr(1) + '">', e += '<p id="quiz-gameover-response"></p>', e += '<p><a href="#" id="quiz-retry-btn">' + h + "</a></p>", o.$el.append(e += "</div>")), z("#quiz-gameover-response").html(t), z("#quiz-counter").hide(), z("#questions").hide(), z("#quiz-finish-btn").hide(), z(c).show()
            },
            finish: function () {
                o.$el.removeClass("quiz-questions-state").addClass("quiz-results-state"), z(".active-question").hide().removeClass("active-question"), z("#quiz-counter").hide(), z("#quiz-response").hide(), z("#quiz-finish-btn").hide(), z("#quiz-next-btn").hide(), z("#quiz-restart-btn").show(), z(a).show();
                var t = o.options.resultsFormat.replace("%score", p).replace("%total", i);
                z("#quiz-results").html(t), "function" == typeof o.options.finishCallback && o.options.finishCallback()
            },
            restart: function () {
                o.methods.reset(), o.$el.addClass("quiz-questions-state"), z("#questions").show(), z("#quiz-counter").show(), z(".question-container:first-child").show().addClass("active-question"), o.methods.updateCounter()
            },
            reset: function () {
                f = !1, q = 1, p = 0, z(".answers a").removeClass("correct incorrect"), o.$el.removeClass().addClass("quiz-container"), z("#quiz-restart-btn").hide(), z(c).hide(), z(a).hide(), z("#quiz-controls").hide(), z("#quiz-response").show(), z("#quiz-next-btn").show(), z("#quiz-counter").hide(), z(".active-question").hide().removeClass("active-question"), "function" == typeof o.options.resetCallback && o.options.resetCallback()
            },
            home: function () {
                o.methods.reset(), o.$el.addClass("quiz-start-state"), z(n).show(), "function" == typeof o.options.homeCallback && o.options.homeCallback()
            },
            updateCounter: function () {
                var t = o.options.counterFormat.replace("%current", q).replace("%total", i);
                z("#quiz-counter").html(t)
            }
        }, o.methods.init()
    }, z.quiz.defaultOptions = {
        allowIncorrect: !0,
        counter: !0,
        counterFormat: "%current/%total",
        startScreen: "#quiz-start-screen",
        startButton: "#quiz-start-btn",
        homeButton: "#quiz-home-btn",
        resultsScreen: "#quiz-results-screen",
        resultsFormat: "You got %score out of %total correct!",
        gameOverScreen: "#quiz-gameover-screen",
        nextButtonText: "Next",
        finishButtonText: "Finish",
        restartButtonText: "Restart"
    }, z.fn.quiz = function (t) {
        return this.each(function () {
            new z.quiz(this, t)
        })
    }
}(jQuery, (window, document));

const myQuiz = [{
    'q': 'What kind of world setting is cyberpunk usually associated with?',
    'options': [
        'Utopian',
        'Dystopian',
    ],
    'correctIndex': 1,
    'correctResponse': 'Correct! Cyberpunk is a subgenre of science fiction in a dystopian futuristic setting.',
    'incorrectResponse': 'Try again! Cyberpunk is a subgenre of science fiction in a dystopian futuristic setting.'
},
{
    'q': 'Which anime marked the beginning of the Japanese cyberpunk subgenre?',
    'options': [
        'Akira',
        'Ghost in the Shell'
    ],
    'correctIndex': 0,
    'correctResponse': "Correct! The Japanese cyberpunk subgenre began in 1982 with the debut of Katsuhiro Otomo's manga series Akira.",
    'incorrectResponse': "Try again! The Japanese cyberpunk subgenre began in 1982 with the debut of Katsuhiro Otomo's manga series Akira."
},
{
    'q': 'A smaple question?',
    'options': [
        'Answer 1',
        'Answer 2',
        'Answer 3',
        'Answer 4'
    ],
    'correctIndex': 2,
    'correctResponse': 'Custom correct response.',
    'incorrectResponse': 'Custom incorrect response.'
},
{
    'q': 'A smaple question?',
    'options': [
        'Answer 1',
        'Answer 2'
    ],
    'correctIndex': 1,
    'correctResponse': 'Custom correct response.',
    'incorrectResponse': 'Custom incorrect response.'
},
{
    'q': 'A smaple question?',
    'options': [
        'Answer 1',
        'Answer 2',
        'Answer 3',
        'Answer 4'
    ],
    'correctIndex': 3,
    'correctResponse': 'Custom correct response.',
    'incorrectResponse': 'Custom incorrect response.'
}
]

$('#quiz').quiz({
    questions: myQuiz
});