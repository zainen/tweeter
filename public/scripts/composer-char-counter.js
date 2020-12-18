$(() => {
  const $textArea = $('#tweet-text');
  const updateCount = () => {
    const currentCount = 140 - $textArea.val().length;
    const $counter = $('.counter');
    $counter.text(currentCount);
    if (currentCount < 0) {
      $counter.addClass('red');
    } else {
      $counter.removeClass('red');
    }
  };
  $textArea.on('keyup', updateCount);
});
