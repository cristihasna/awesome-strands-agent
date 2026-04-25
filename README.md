# AgentCore Toolkit Demo

This project is a small test application for demonstrating how to use the Amazon Bedrock AgentCore toolkit with a TypeScript-based agent runtime.

It includes:

- A simple Strands agent defined in `src/agent.ts`
- A Bedrock AgentCore runtime entry point in `src/runtime.ts`
- A minimal custom tool to show how tools can be exposed to the agent

The current demo uses the Google Gemini API model `gemini-3-flash-lite-preview` and is intended to be configured and deployed with the `agentcore` CLI.

## Prerequisites

Before you start, make sure the following are available on your machine:

- Python 3
- Node.js 20+
- A Gemini API key
- AWS CLI configured for the account/profile you want to use if you plan to deploy with AgentCore
- `agentcore` CLI available in a Python environment

## Gemini API Authentication In AgentCore

For deployed AgentCore runtimes, set `GEMIN_API_KEY` as a runtime environment variable. Do not put it in source code and do not bake it into the Dockerfile image.

Recommended setup:

1. Deploy the agent.
2. Add `GEMIN_API_KEY` to the AgentCore runtime environment variables.

Notes:
- AgentCore Runtime supports environment variables in the runtime configuration.
- This code reads the Gemini API key directly from `GEMIN_API_KEY`.

## AWS Authentication For AgentCore Deployment

If you plan to deploy this runtime with AgentCore, you still need AWS credentials for the deployment flow itself.

Suggested flow:

```bash
aws login --profile myProfile
eval $(aws configure export-credentials --profile myProfile --format env)
```

Notes:
- Make sure the aws region is set to `eu-west-1` by running `export AWS_REGION=eu-west-1` if not already set.
- Run the `eval $(aws configure export-credentials ...)` command in the same shell where you plan to run the AgentCore CLI.

## Install

Make sure Python is installed:

```bash
python3 --version
```

If you do not already have a virtual environment for `agentcore`, create and activate one:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

If the repository already includes a local virtual environment, activate it instead:

```bash
source .venv/bin/activate
```

Install the AgentCore CLI into that environment:

```bash
pip install bedrock-agentcore
```

## Configure And Deploy

Once AWS credentials are available in your shell and the virtual environment is active, configure the project with:

```bash
agentcore configure --entrypoint src/runtime.ts
```

This generates the AgentCore deployment scaffolding for the project, including:

- `.dockerignore`
- `Dockerfile`
- Agent configuration YAML

After configuration, deploy the agent:

```bash
agentcore deploy
```

This provisions the required AWS resources for the deployed AgentCore runtime.

## Invoke The Agent

After deployment completes, invoke the deployed agent with:

```bash
agentcore invoke '{"prompt": "I want to be the most awesome!"}'
```

## Local Execution

This repo is documented around the AgentCore deployment flow rather than a local runtime workflow.

There are no local run commands documented here as the intended path for this project is:

1. Authenticate to AWS
2. Configure the AgentCore project
3. Deploy to AWS
4. Invoke the deployed agent

## Project Structure

```text
src/
  agent.ts     Defines the Strands agent and demo tool
  runtime.ts   Exposes the Bedrock AgentCore runtime handler
```

## How It Works

`src/agent.ts` reads the Gemini API key directly from the runtime environment variable `GEMIN_API_KEY`, creates a Strands `Agent` backed by the Gemini API model `gemini-3-flash-lite-preview`, and registers a demo tool named `be_awesome`.

`src/runtime.ts` wraps that agent in a `BedrockAgentCoreApp` and validates incoming requests with a simple schema:

```json
{
  "prompt": "Your prompt goes here"
}
```

The runtime passes the prompt to the agent and returns the agent response as JSON.

## Intended Use

This repository is meant to be a testing/demo project for:

- Trying out AgentCore toolkit integration
- Validating AWS authentication and AgentCore deployment behavior
- Experimenting with simple tools and agent invocation flow
- Using a small codebase for demos, prototypes, and onboarding
