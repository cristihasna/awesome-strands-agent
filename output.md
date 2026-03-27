# Agent Trace

## 🔄 Agent loop initialized

## ▶️ Agent loop started

## 🤖 About to invoke model with messages

`event.agent.messages`:

```json
[
  {
    "role": "user",
    "content": [
      {
        "text": "I am fairly awesome, but I want to be a lot more awesome. Can you help me with that?"
      }
    ]
  }
]
```

## ✏️ New delta

`event.event.delta`:

```json
{
  "type": "toolUseInputDelta",
  "input": "{\"awesomenessLevel\":\"very\"}"
}
```

## 📊 Token usage updated

`{ current: event.event.usage, total: totalUsage }`:

```json
{
  "current": {
    "inputTokens": 115,
    "outputTokens": 122,
    "totalTokens": 237
  },
  "total": {
    "inputTokens": 115,
    "outputTokens": 122,
    "totalTokens": 237,
    "cacheReadInputTokens": 0,
    "cacheWriteInputTokens": 0
  }
}
```

## 💬 Message returned

`event.message`:

```json
{
  "role": "assistant",
  "content": [
    {
      "toolUse": {
        "name": "be_awesome",
        "toolUseId": "d6jgqhur",
        "input": {
          "awesomenessLevel": "very"
        },
        "reasoningSignature": "EpwECpkEAb4+9vu0k7KD0MtgZaHl9N3r0RgHmXKFaL1Cn+ZZk7PNAVfp9dOfb6HXIjmWTJVS17FGAqSGIdUL4c1WJyRR8OEs7M6DvwMCV6H4mHQpHkR37qZoNUHBZaqztXCIevyIk4x2wxWxHsP6cfol7AJnTd9+jxxZPe052hmf+k8vcMyd2VMYxeOLsRkmFcVW9VUD51yeynYq3qc1qdveT7jrnVe8XyL7Wkh6+BlBE3ePNr3xO58Mqlqs+XFHCnhW7z9TBesS5YGh5fyzBpFNPMwJkN34xbOAwEJzcuwXIbOExYq+PCD8bWQNKMKJNTBOFy16lVzLaDll8Hs2Fmo+ZDRoYKqnlY22utcQMQitdJKQ7/TwyZujk7insWHOc6XUBVP/3g4iFNO8aVfEM4N6evm+zSb/A121WhELWQ1/xL7uZvJfotgiIWafJ0cs/cJSZdj50u2JDrlBT8kj7xffBlGOS74qMl11BZFH/V6fnUp1IzmfRDG7vgvWSHioRm41bQGTJxIy5DtecL26SyDJwIkvf5Da4XQbr+nj+IEi3OC+eVce2ymSn3IAz8xbkUVMn7ZnM39tombPWE8VDDluhLoStQ1BSL0ce3nM8XUOj4GFlMOcOVP57hFKFUZVFKCdOkX2lHT1xrd/xDIEmjFPywDBq7RkfzKeO0BvrFrytyvPo88Vc4ZfhGk9/cdpv2SixI5SBJl133sltD5/"
      }
    }
  ]
}
```

## 📬 Model invocation completed

`event.stopData.message`:

```json
{
  "role": "assistant",
  "content": [
    {
      "toolUse": {
        "name": "be_awesome",
        "toolUseId": "d6jgqhur",
        "input": {
          "awesomenessLevel": "very"
        },
        "reasoningSignature": "EpwECpkEAb4+9vu0k7KD0MtgZaHl9N3r0RgHmXKFaL1Cn+ZZk7PNAVfp9dOfb6HXIjmWTJVS17FGAqSGIdUL4c1WJyRR8OEs7M6DvwMCV6H4mHQpHkR37qZoNUHBZaqztXCIevyIk4x2wxWxHsP6cfol7AJnTd9+jxxZPe052hmf+k8vcMyd2VMYxeOLsRkmFcVW9VUD51yeynYq3qc1qdveT7jrnVe8XyL7Wkh6+BlBE3ePNr3xO58Mqlqs+XFHCnhW7z9TBesS5YGh5fyzBpFNPMwJkN34xbOAwEJzcuwXIbOExYq+PCD8bWQNKMKJNTBOFy16lVzLaDll8Hs2Fmo+ZDRoYKqnlY22utcQMQitdJKQ7/TwyZujk7insWHOc6XUBVP/3g4iFNO8aVfEM4N6evm+zSb/A121WhELWQ1/xL7uZvJfotgiIWafJ0cs/cJSZdj50u2JDrlBT8kj7xffBlGOS74qMl11BZFH/V6fnUp1IzmfRDG7vgvWSHioRm41bQGTJxIy5DtecL26SyDJwIkvf5Da4XQbr+nj+IEi3OC+eVce2ymSn3IAz8xbkUVMn7ZnM39tombPWE8VDDluhLoStQ1BSL0ce3nM8XUOj4GFlMOcOVP57hFKFUZVFKCdOkX2lHT1xrd/xDIEmjFPywDBq7RkfzKeO0BvrFrytyvPo88Vc4ZfhGk9/cdpv2SixI5SBJl133sltD5/"
      }
    }
  ]
}
```

## 🧭 Model result indicates tool execution

`event.message`:

```json
{
  "role": "assistant",
  "content": [
    {
      "toolUse": {
        "name": "be_awesome",
        "toolUseId": "d6jgqhur",
        "input": {
          "awesomenessLevel": "very"
        },
        "reasoningSignature": "EpwECpkEAb4+9vu0k7KD0MtgZaHl9N3r0RgHmXKFaL1Cn+ZZk7PNAVfp9dOfb6HXIjmWTJVS17FGAqSGIdUL4c1WJyRR8OEs7M6DvwMCV6H4mHQpHkR37qZoNUHBZaqztXCIevyIk4x2wxWxHsP6cfol7AJnTd9+jxxZPe052hmf+k8vcMyd2VMYxeOLsRkmFcVW9VUD51yeynYq3qc1qdveT7jrnVe8XyL7Wkh6+BlBE3ePNr3xO58Mqlqs+XFHCnhW7z9TBesS5YGh5fyzBpFNPMwJkN34xbOAwEJzcuwXIbOExYq+PCD8bWQNKMKJNTBOFy16lVzLaDll8Hs2Fmo+ZDRoYKqnlY22utcQMQitdJKQ7/TwyZujk7insWHOc6XUBVP/3g4iFNO8aVfEM4N6evm+zSb/A121WhELWQ1/xL7uZvJfotgiIWafJ0cs/cJSZdj50u2JDrlBT8kj7xffBlGOS74qMl11BZFH/V6fnUp1IzmfRDG7vgvWSHioRm41bQGTJxIy5DtecL26SyDJwIkvf5Da4XQbr+nj+IEi3OC+eVce2ymSn3IAz8xbkUVMn7ZnM39tombPWE8VDDluhLoStQ1BSL0ce3nM8XUOj4GFlMOcOVP57hFKFUZVFKCdOkX2lHT1xrd/xDIEmjFPywDBq7RkfzKeO0BvrFrytyvPo88Vc4ZfhGk9/cdpv2SixI5SBJl133sltD5/"
      }
    }
  ]
}
```

## 🛠️ Calling tool "be_awesome"

`event.toolUse.input`:

```json
{
  "awesomenessLevel": "very"
}
```

## ✅ Finished calling tool "be_awesome"

`event.result.content`:

```json
[
  {
    "text": "Congrats, you are now very awesome! 🎉"
  }
]
```

## ▶️ Agent loop started

## 🤖 About to invoke model with messages

`event.agent.messages`:

```json
[
  {
    "role": "user",
    "content": [
      {
        "text": "I am fairly awesome, but I want to be a lot more awesome. Can you help me with that?"
      }
    ]
  },
  {
    "role": "assistant",
    "content": [
      {
        "toolUse": {
          "name": "be_awesome",
          "toolUseId": "d6jgqhur",
          "input": {
            "awesomenessLevel": "very"
          },
          "reasoningSignature": "EpwECpkEAb4+9vu0k7KD0MtgZaHl9N3r0RgHmXKFaL1Cn+ZZk7PNAVfp9dOfb6HXIjmWTJVS17FGAqSGIdUL4c1WJyRR8OEs7M6DvwMCV6H4mHQpHkR37qZoNUHBZaqztXCIevyIk4x2wxWxHsP6cfol7AJnTd9+jxxZPe052hmf+k8vcMyd2VMYxeOLsRkmFcVW9VUD51yeynYq3qc1qdveT7jrnVe8XyL7Wkh6+BlBE3ePNr3xO58Mqlqs+XFHCnhW7z9TBesS5YGh5fyzBpFNPMwJkN34xbOAwEJzcuwXIbOExYq+PCD8bWQNKMKJNTBOFy16lVzLaDll8Hs2Fmo+ZDRoYKqnlY22utcQMQitdJKQ7/TwyZujk7insWHOc6XUBVP/3g4iFNO8aVfEM4N6evm+zSb/A121WhELWQ1/xL7uZvJfotgiIWafJ0cs/cJSZdj50u2JDrlBT8kj7xffBlGOS74qMl11BZFH/V6fnUp1IzmfRDG7vgvWSHioRm41bQGTJxIy5DtecL26SyDJwIkvf5Da4XQbr+nj+IEi3OC+eVce2ymSn3IAz8xbkUVMn7ZnM39tombPWE8VDDluhLoStQ1BSL0ce3nM8XUOj4GFlMOcOVP57hFKFUZVFKCdOkX2lHT1xrd/xDIEmjFPywDBq7RkfzKeO0BvrFrytyvPo88Vc4ZfhGk9/cdpv2SixI5SBJl133sltD5/"
        }
      }
    ]
  },
  {
    "role": "user",
    "content": [
      {
        "toolResult": {
          "toolUseId": "d6jgqhur",
          "status": "success",
          "content": [
            {
              "text": "Congrats, you are now very awesome! 🎉"
            }
          ]
        }
      }
    ]
  }
]
```

## ✏️ New delta

`event.event.delta`:

```json
{
  "type": "textDelta",
  "text": "OK"
}
```

## ✏️ New delta

`event.event.delta`:

```json
{
  "type": "textDelta",
  "text": "! You are now officially very awesome. Enjoy your upgraded level of awesomeness"
}
```

## ✏️ New delta

`event.event.delta`:

```json
{
  "type": "textDelta",
  "text": "! 🎉"
}
```

## 📊 Token usage updated

`{ current: event.event.usage, total: totalUsage }`:

```json
{
  "current": {
    "inputTokens": 262,
    "outputTokens": 19,
    "totalTokens": 281
  },
  "total": {
    "inputTokens": 377,
    "outputTokens": 141,
    "totalTokens": 518,
    "cacheReadInputTokens": 0,
    "cacheWriteInputTokens": 0
  }
}
```

## 💬 Message returned

`event.message`:

```json
{
  "role": "assistant",
  "content": [
    {
      "text": "OK! You are now officially very awesome. Enjoy your upgraded level of awesomeness! 🎉"
    }
  ]
}
```

## 📬 Model invocation completed

`event.stopData.message`:

```json
{
  "role": "assistant",
  "content": [
    {
      "text": "OK! You are now officially very awesome. Enjoy your upgraded level of awesomeness! 🎉"
    }
  ]
}
```

## ✅ Agent loop completed
