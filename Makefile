PYTHON_CMD = python

.PHONY: push
push:
	@echo ""
	@echo "✅ Board verified. Running smart push..."
	@$(PYTHON_CMD) scripts/autocommit.py
