describe("VideoUrl", function(){
  var view;

  beforeEach(function(){
    view = new App.views.ProjectForm.views.VideoUrl({ el: $('<input value="http://video.url" data-path="check_video_path">') });
  });

  describe("checkVideoUrl", function(){
    var get;
    beforeEach(function() {
      get = spyOn($, "get").andReturn({ success: function(){} });
      spyOn(view.$el, "trigger");
    });

    it("should call using path in data-path and send the val as url", function(){
      view.checkVideoUrl();
      expect($.get).wasCalledWith('check_video_path?url=' + encodeURIComponent('http://video.url'));
    });

    describe("when video url is not valid", function(){
      beforeEach(function(){
        get.andReturn({ success: function(callback){ callback(null); } });
        view.checkVideoUrl();
      });

      it("should trigger invalid", function(){
        expect(view.$el.trigger).wasCalledWith('invalid');
      });
    });

    describe("when video url is valid", function(){
      beforeEach(function(){
        get.andReturn({ success: function(callback){ callback({ video_id: 111 }); } });
        view.checkVideoUrl();
      });

      it("should not trigger invalid", function(){
        expect(view.$el.trigger).wasNotCalled();
      });
    });
  });
});
