# Settings Feature — Integrations & Brand Controls (Part 6)

## 📡 Planned Endpoints
- `GET /settings/integrations`: Connection status of Meta Ads, Google Ads, GA4, Shopify.
- `POST /settings/integrations/:provider/connect`: Initiate OAuth connection.
- `DELETE /settings/integrations/:provider/disconnect`: Revoke ad platform access.
- `GET /settings/business`: Brand guidelines, tone of voice, budget guardrails.
- `PUT /settings/business`: Update brand profile settings.

## 🎨 UI States Handled
- **Loading**: Skeleton toggle rows.
- **Empty**: EmptyState for unconnected integrations.
- **Error**: Error banner with retry.

## 🛡 Actions Requiring Approval
- Disconnecting ad accounts or altering global budget safety caps.
