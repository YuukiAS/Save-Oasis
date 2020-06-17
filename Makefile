all:
	elm make src/Breakout.elm
	mv index.html build/game.html
	elm make src/Help.elm
	mv index.html build/help.html
	elm make src/Main.elm
	mv index.html build/home.html