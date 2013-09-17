var APP_ID = '';
console.log('receiver');

$(function() {
	console.log('ready', cast.receiver);
	var receiver = new cast.receiver.Receiver(APP_ID, ["castaway"]),
		channelHandler = new cast.receiver.ChannelHandler("castaway"),
		$body = $('body');

	channelHandler.addChannelFactory(
		receiver.createChannelFactory("castaway"));

	receiver.start();

	channelHandler.addEventListener(cast.receiver.Channel.EventType.MESSAGE, onMessage.bind(this));

	function onMessage(event) {
		$body.css('background-image','url('+event.message.src+')').addClass('image');
	}
});