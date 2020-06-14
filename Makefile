all:
	elm make src/Breakout.elm
	mv index.html game.html
	elm make src/Help.elm
	mv index.html help.html
	elm make src/Main.elm
	cp index.html build/index.html
	mv index.html home.html