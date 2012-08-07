
build: template.js dialog.css index.js
	component build

template.js: dialog.html
	component convert $<

clean:
	rm -fr build
	rm -f template.js

.PHONY: clean