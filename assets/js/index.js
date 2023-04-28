$('#add_user').submit(function () {
	alert('데이터가 성공적으로 삽입되었습니다.');
});

$('#update_user').submit(function (event) {
	event.preventDefault();

	let unIndexedArray = $(this).serializeArray();
	let data = {};

	$.map(unIndexedArray, function (value, index) {
		data[value['name']] = value['value'];
	});

	let request = {
		url: `http://localhost:5555/api/users/${data.id}`,
		method: 'PUT',
		data: data,
	};

	$.ajax(request).done((response) => {
		alert('데이터 업데이트 성공');
	});
});

if (window.location.pathname == '/') {
	$onDelete = $('.table tbody td a.delete');
	$onDelete.click(function () {
		let id = $(this).attr('data-id');

		let request = {
			url: `http://localhost:5555/api/users/${id}`,
			method: 'DELETE',
		};

		if (confirm('진짜 지울거에요?')) {
			$.ajax(request).done((response) => {
				alert('데이터가 성공적으로 지워졌습니다.');
				location.reload();
			});
		}
	});
}
