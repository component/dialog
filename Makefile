
all: build

components: component.json
	component install --dev

build: index.js dialog.css template.html | components
	component build --dev

clean:
	rm -rf components build

test: test-phantom

test-phantom: | build
	component test phantom

test-browser: | build
	component test browser


.PHONY: all clean test test-phantom test-browser
