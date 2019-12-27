import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver } from "graphql";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";

class IsPatientDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function (...args) {
      // extract user from context
      const { user } = args[2]

      if (!user) {
        throw new AuthenticationError('You must be authenticated.')
      }

      if (user['custom:type'] != 'patient') {
        throw new ForbiddenError('This operation can only be performed from a patient account.')
      }

      return resolve.apply(this, args)
    }
  }
}

module.exports = IsPatientDirective