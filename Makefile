PYTHON_CMD = python3

.PHONY: push
push:
	@echo ""
	@echo "✅ Board verified. Running smart push..."
	@$(PYTHON_CMD) scripts/autocommit.py

.PHONY: run
run:
	@$(PYTHON_CMD) scripts/serve.py
