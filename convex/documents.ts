import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identy = await ctx.auth.getUserIdentity();
    if (!identy) {
      throw new Error("Not authenticated");
    }

    const userId = identy.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      userId,
      isArchived: false,
      parentDocument: args.parentDocument,
      isPublished: false,
    });
    return document;
  },
});
