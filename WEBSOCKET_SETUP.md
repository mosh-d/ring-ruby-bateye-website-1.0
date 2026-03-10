# WebSocket Implementation - Ring Ruby Bateye

## Setup Complete ✅

WebSocket has been successfully implemented for real-time room availability updates.

## Configuration

- **Branch ID**: 14
- **WebSocket Server**: `http://localhost:3000` (development) / `https://five-clover-shared-backend.onrender.com` (production)
- **Event**: `rooms_updated`

## Files Created/Modified

1. **`src/hooks/useWebSocket.js`** - WebSocket hook for managing connections
2. **`src/admin_pages/AdminOverview.jsx`** - Updated to use WebSocket for admin panel
3. **`src/components/home/AvailableRoomsSection.jsx`** - Updated to use WebSocket for room availability
4. **`src/pages/Root.jsx`** - Updated to use WebSocket for booking flow
5. **`.env.development`** - Development environment configuration
6. **`.env.example`** - Example environment configuration
7. **`package.json`** - Added `socket.io-client@^4.8.3`

## Installation

Run the following command to install the new dependency:

```bash
npm install
```

## Testing

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Check Browser Console

Open the browser console and look for these logs:

- `🔌 Initializing WebSocket connection to: http://localhost:3000`
- `📍 Branch ID: 14`
- `✅ WebSocket connected: [socket-id]`

### 3. Test Real-Time Updates

#### Option A: Manual Room Count Update
1. Go to the Admin Overview page
2. Click on a room count to edit it
3. Change the value and click "Update"
4. The WebSocket should emit a `rooms_updated` event
5. All connected clients for branch 14 should refresh automatically

#### Option B: API Test (using curl or Postman)

Create a test reservation to trigger the `rooms_updated` event:

```bash
curl -X POST http://localhost:3000/api/reservations/hold \
  -H "Content-Type: application/json" \
  -d '{
    "branch_id": 14,
    "room_type_id": 49,
    "guest_name": "Test User",
    "guest_email": "test@example.com",
    "check_in": "2026-03-15",
    "check_out": "2026-03-17",
    "rooms_booked": 1
  }'
```

Expected console output:
```
📢 Rooms updated event received: { branch_id: 14 }
✅ Update is for our branch ( 14 ), refreshing data...
🔄 Refreshing room data due to WebSocket update...
```

### 4. Connection Status Indicator

Look for the connection status badge in the top-right corner of the Admin Overview page:

- **🟢 Live Updates Active** - WebSocket is connected
- **🟡 Reconnecting...** - WebSocket is disconnected, attempting to reconnect

## Features

### Real-Time Updates
- Room availability updates **instantly** when changes occur (no 60-second delay)
- Updates trigger in:
  - Admin Overview page (when room counts change)
  - Available Rooms Section (home page)
  - Booking flow (Root.jsx)
- No need to refresh the page manually
- Updates only trigger for branch 14 (ignores other branches)

### Automatic Reconnection
- Reconnects automatically if connection is lost
- Exponential backoff (1s, 2s, 3s, 4s, 5s max)
- Up to 5 reconnection attempts

### Graceful Degradation
- Polling fallback only activates if WebSocket is disconnected
- Polling interval: 60 seconds (only when WebSocket is down)
- App works even if WebSocket fails
- Maintenance mode checking continues independently

## Troubleshooting

### WebSocket Not Connecting

**Check console for errors:**
```
❌ WebSocket connection error: [error message]
```

**Solutions:**
1. Verify backend is running on `http://localhost:3000`
2. Check CORS configuration on backend
3. Ensure `.env.development` has correct `VITE_BACKEND_URL`

### Not Receiving Events

**Check console logs:**
```
ℹ️ Update is for different branch ( X ), ignoring...
```

**Solutions:**
1. Verify `VITE_BRANCH_ID=14` in `.env.development`
2. Ensure test API calls use `branch_id: 14`
3. Check that backend is emitting events correctly

### Multiple Connections

**Symptoms:** Multiple socket IDs in console

**Solutions:**
1. Ensure React StrictMode is not causing double renders
2. Check that cleanup function is working (look for disconnect logs)

## Environment Variables

### Development (`.env.development`)
```bash
VITE_BACKEND_URL=http://localhost:3000
VITE_BRANCH_ID=14
```

### Production (`.env.production`)
```bash
VITE_BACKEND_URL=https://five-clover-shared-backend.onrender.com
VITE_BRANCH_ID=14
```

## Next Steps

Once testing is complete and working:

1. ✅ Verify WebSocket connects successfully
2. ✅ Confirm room updates trigger real-time refresh
3. ✅ Test reconnection by stopping/starting backend
4. ✅ Verify branch filtering (only branch 14 updates trigger refresh)
5. 🔄 Deploy to production
6. 🔄 Implement on other branches

## Support

For issues or questions:
- Check browser console for detailed logs
- Enable Socket.io debug mode: `localStorage.debug = 'socket.io-client:*'`
- Review backend logs for WebSocket events
