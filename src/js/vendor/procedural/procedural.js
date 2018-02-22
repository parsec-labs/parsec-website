"use strict";

window.SS = window.SS || {};
SS.main = SS.main || {};

SS.main.main = function() {
	window.rendererProcedural = new THREE.WebGLRenderer({antialias: true, alpha: true});
	var rendererProcedural = window.rendererProcedural;

	window.proceduralParent = document.getElementById('planet-scene');
	var proceduralParent = window.proceduralParent;
	proceduralParent.appendChild(rendererProcedural.domElement);

	rendererProcedural.gammaInput = true;
	rendererProcedural.gammaOutput = true;
	rendererProcedural.setClearColor(0x000000, 1);
	rendererProcedural.setSize($(proceduralParent).width(), $(proceduralParent).height());
	rendererProcedural.domElement.setAttribute('id', 'rendererProcedural');


	window.sceneProcedural = new THREE.Scene();
	var ratio = rendererProcedural.getContext().drawingBufferWidth / rendererProcedural.getContext().drawingBufferHeight;
	window.cameraProcedural = new THREE.PerspectiveCamera(60, ratio, 0.1, 10000);
	window.editorCamera = new SS.util.EditorCamera(cameraProcedural, document, 15, new THREE.Vector2(-Math.PI*(1/2),-Math.PI*(1/9)));

	SS.util.addResizeListener();
	SS.main.addSceneContent(sceneProcedural);

	SS.main.render();
}

SS.main.render = function() {
	requestAnimationFrame(SS.main.render);

	window.time = window.time || new Date().getTime();
	var newTime = new Date().getTime();
	var diff = newTime - time;
	console.log($(proceduralParent).parent().hasClass('in-view'));
	if ($(proceduralParent).parent().hasClass('in-view')) {
		editorCamera.cameraPos.y -= diff/800*(2*3.1415)*(1/3600/24)*3000;
		editorCamera.cameraPos.z -= diff/800*(2*3.1415)*(1/3600/24)*3000;
		editorCamera.cameraStartPos = editorCamera.cameraPos;
		editorCamera.rotateCamera();
	}
	time = newTime;

	window.rendererProcedural.render(window.sceneProcedural, window.cameraProcedural);
};

SS.main.addSceneContent = function(sceneProcedural) {
	window.sunLight = new THREE.PointLight(new THREE.Color(0x00FF00), 1.0);
	sunLight.position.set(100, 0, 0);
	sceneProcedural.add(sunLight);

	var maps = SS.main.generateTextures();

	sceneProcedural.add(new SS.planet.Planet(5, maps.textureMaps, maps.bumpMaps));

	//sceneProcedural.add(new SS.starbox.StarBox(4000));
}

SS.main.generateTextures = function() {
	var textureMaps = [];
	var bumpMaps = [];
	var resolution = 1024;

	for (var index = 0; index < 6; index++) {
		var texture = new THREE.WebGLRenderTarget(resolution, resolution, {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat});

		var textureCamera = new THREE.OrthographicCamera(-resolution/2, resolution/2, resolution/2, -resolution/2, -100, 100);
		textureCamera.position.z = 10;

		var textureScene = new THREE.Scene();
		var plane = new THREE.Mesh(
			new THREE.PlaneGeometry(resolution, resolution),
			new SS.material.textureGeneratorMaterial(index)
		);
		plane.position.z = -10;
		textureScene.add(plane);

		rendererProcedural.render(textureScene, textureCamera, texture, true);

		var buffer = new Uint8Array(resolution * resolution * 4);
		var gl = rendererProcedural.getContext();
		gl.readPixels( 0, 0, resolution, resolution, gl.RGBA, gl.UNSIGNED_BYTE, buffer);

		textureMaps.push(texture);
		bumpMaps.push({image: {data: buffer, height: resolution, width: resolution}});
	}
	return {textureMaps: textureMaps, bumpMaps: bumpMaps};
}
