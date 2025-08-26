const { z } = require('zod');

const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  model: z.string(),
  system: z.string(),
  temperature: z.number().min(0).max(1),
  max_tokens: z.number().int().positive()
});

const configSchema = z.object({
  agents: z.array(agentSchema)
});

const configUpdateSchema = z.object({
  apiKey: z.string().optional(),
  agents: z.array(agentSchema).optional()
});

const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string()
});

const chatSchema = z.object({
  agentId: z.string(),
  messages: z.array(messageSchema),
  temperature: z.number().min(0).max(1).optional(),
  max_tokens: z.number().int().positive().optional()
});

module.exports = {
  agentSchema,
  configSchema,
  configUpdateSchema,
  chatSchema
};
