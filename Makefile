.PHONY: help install dev dev-web dev-liff build lint check-types clean clean-all docker-build docker-up docker-down docker-restart docker-logs docker-ps

# Default target
.DEFAULT_GOAL := help

# Colors
GREEN  := $(shell tput -Txterm setaf 2 2>/dev/null || echo '')
YELLOW := $(shell tput -Txterm setaf 3 2>/dev/null || echo '')
CYAN   := $(shell tput -Txterm setaf 6 2>/dev/null || echo '')
WHITE  := $(shell tput -Txterm setaf 7 2>/dev/null || echo '')
RESET  := $(shell tput -Txterm sgr0 2>/dev/null || echo '')

## Help
help: ## แสดงรายการคำสั่งทั้งหมดใน Makefile
	@echo ''
	@echo '$(GREEN)========================================================$(RESET)'
	@echo '$(GREEN)   ArcherHub - Monorepo Management & Automation CLI     $(RESET)'
	@echo '$(GREEN)========================================================$(RESET)'
	@echo 'Usage: make $(YELLOW)<target>$(RESET)'
	@echo ''
	@echo '$(CYAN)คำสั่งสำหรับการพัฒนา (Local Development):$(RESET)'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | grep -v 'docker-' | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-16s$(RESET) %s\n", $$1, $$2}'
	@echo ''
	@echo '$(CYAN)คำสั่ง Docker & Container:$(RESET)'
	@grep -E '^docker-[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-16s$(RESET) %s\n", $$1, $$2}'
	@echo ''

## Dependencies
install: ## ติดตั้ง dependencies ทั้งหมดใน Monorepo
	npm install

## Local Development
dev: ## รัน Dev Server ทั้งระบบ (Web :3000 และ LIFF :3001 พร้อมกัน)
	npm run dev

dev-web: ## รันเฉพาะ Next.js Web App (พอร์ต 3000)
	npx turbo run dev --filter=web

dev-liff: ## รันเฉพาะ Next.js LIFF App (พอร์ต 3001)
	npx turbo run dev --filter=liff

## Build & Quality Check
build: ## สั่ง Build ตรวจสอบโค้ดทั้งหมด (Turbo Build)
	npm run build

lint: ## ตรวจสอบ Linting ทั้งระบบ
	npm run lint

check-types: ## ตรวจสอบ Type Safety ด้วย TypeScript
	npm run check-types

## Cleaning
clean: ## ลบไฟล์แคชและโฟลเดอร์ build (.next, .turbo)
	rm -rf .turbo apps/*/.next apps/*/.turbo packages/*/.turbo

clean-all: clean ## ล้างแคชทั้งหมดรวมถึง node_modules เพื่อติดตั้งใหม่
	rm -rf node_modules apps/*/node_modules packages/*/node_modules

## Docker & Containers
docker-build: ## สั่ง Build Docker Images สำหรับ Web (:3000) และ LIFF (:3001)
	docker compose build

docker-up: ## รันคอนเทนเนอร์ทั้งหมดใน Background (Web :3000, LIFF :3001)
	docker compose up -d --build

docker-down: ## ปิดคอนเทนเนอร์ทั้งหมดและลบ Network
	docker compose down

docker-restart: ## รีสตาร์ทคอนเทนเนอร์ทั้งหมด
	docker compose restart

docker-logs: ## ดู Real-time Logs ของคอนเทนเนอร์ทุกตัว
	docker compose logs -f

docker-ps: ## ดูสถานะของคอนเทนเนอร์ที่กำลังรัน
	docker compose ps
