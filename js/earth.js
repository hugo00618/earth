var setMaterial = function(object, material) {
	object.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			child.material = material;
		}
	});
};

var addObject = function(object) {
	model.add(object);
	if (model.children.length == 3) {
		scene.add(model);
	}
}

var init3D = function() {
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	var containerMinSize = Math.min($('#canvas').innerHeight(), $('#canvas').innerWidth());
	renderer.setSize(containerMinSize, containerMinSize);
	$('#canvas').append( renderer.domElement );

 	camera = new THREE.OrthographicCamera( containerMinSize / - 2, containerMinSize / 2, containerMinSize / 2, containerMinSize / - 2, 0.1, 1000 );
 	camera.zoom = 2;
 	camera.updateProjectionMatrix();

	// control
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = false;

	controls.minPolarAngle = Math.PI / 180 * 80;
	controls.maxPolarAngle = Math.PI / 180 * 80;

	controls.rotateSpeed = 0.2;

	
	// light
	var keyLight = new THREE.DirectionalLight(0xfff8ef, 0.75);
	keyLight.position.set(-100, 200, -50);

	var keyLight2 = new THREE.DirectionalLight(0xfff8ef, 0.75);
	keyLight2.position.set(-100, -200, -50);

	scene.add(camera);
	camera.add(keyLight);
	camera.add(keyLight2);


	// object
	var matOcean = new THREE.MeshPhongMaterial( { color: 0x488feb, specular: 0xffffff, shininess: 0, flatShading: THREE.SmoothShading } );
	var matLand = new THREE.MeshPhongMaterial( { color: 0x6acc50, specular: 0xffffff, shininess: 0, flatShading: THREE.SmoothShading } );
	var matIce = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 0, flatShading: THREE.SmoothShading } );

	model = new THREE.Group();
	var loader = new THREE.OBJLoader();
	loader.load(
		'assets/ocean.obj',
		function ( object ) {
			setMaterial(object, matOcean);
			addObject(object);
		}
	);

	loader.load(
		'assets/land.obj',
		function ( object ) {
			setMaterial(object, matLand);
			addObject(object);
		}
	);

	loader.load(
		'assets/ice.obj',
		function ( object ) {
			setMaterial(object, matIce);
			addObject(object);
		}
	);

	camera.position.z = 250;

	var animate = function () {
		requestAnimationFrame( animate );
		controls.update();

		model.rotation.y += 0.005;

		renderer.render( scene, camera );
	};

	animate();
}

$(document).ready(function() {
	init3D();

	$('#fullpage').fullpage({
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',

		verticalCentered: false,
		scrollOverflow: true
	}); 

	$('#btnLearnMore').click(function() {
		$.fn.fullpage.moveSectionDown();
	});
});

$(window).resize(function() {
	$('canvas').css('display', 'none');
	var containerMinSize = Math.min($('#canvas').innerHeight(), $('#canvas').innerWidth());
	$('canvas').css('display', 'initial');

	renderer.setSize(containerMinSize, containerMinSize);

	camera.left = containerMinSize / -2;
	camera.right = containerMinSize / 2;
	camera.top = containerMinSize / 2;
	camera.bottom = containerMinSize / -2;
	camera.updateProjectionMatrix();
});