/*
 * jQuery idleTimer plugin
 * by Paul irish. adapted by YUI idle timer by nzakas.
 
 *
 * Copyright (c) 2009 Nicholas C. Zakas
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($){

$.idleTimer = {

    idle    : false,        //indicates if the user is idle
    tId     : -1,           //timeout ID
    enabled : false,        //indicates if the idle timer is enabled
    timeout : 30000,        //the amount of time (ms) before the user is considered idle

        
    /* (intentionally not documented)
     * Handles a user event indicating that the user isn't idle.
     * @param {Event} event A DOM2-normalized event object.
     * @return {void}
     */
    handleUserEvent : function(){
    
        //clear any existing timeout
        clearTimeout($.idleTimer.tId);
        
        //if the idle timer is enabled
        if ($.idleTimer.enabled){
        
            //if it's idle, that means the user is no longer idle
            if ($.idleTimer.idle){
                $.idleTimer.toggleIdleState();           
            } else {
                //set a new timeout
                $.idleTimer.tId = setTimeout($.idleTimer.toggleIdleState, $.idleTimer.timeout);
            }
        }    
    },
    
    /* (intentionally not documented)
     * Toggles the idle state and fires an appropriate event.
     * @return {void}
     */
    toggleIdleState : function(){
    
        //toggle the state
        $.idleTimer.idle = !$.idleTimer.idle;
        
        //fire appropriate event
        $(document).trigger(($.idleTimer.idle ? "idle" : "active") + '.idleTimer');            
    },

    
    /**
     * Indicates if the idle timer is running or not.
     * @return {Boolean} True if the idle timer is running, false if not.
     * @method isRunning
     * @static
     */
    isRunning: function(){
        return $.idleTimer.enabled;
    },
    
    /**
     * Indicates if the user is idle or not.
     * @return {Boolean} True if the user is idle, false if not.
     * @method isIdle
     * @static
     */        
    isIdle: function(){
        return $.idleTimer.idle;
    },
    
    /**
     * Starts the idle timer. This adds appropriate event handlers
     * and starts the first timeout.
     * @param {int} newTimeout (Optional) A new value for the timeout period in ms.
     * @return {void}
     * @method start
     * @static
     */ 
    start: function(newTimeout){
        
        //set to enabled
        $.idleTimer.enabled = true;
        
        //set idle to false to begin with
        $.idleTimer.idle = false;
        
        //assign a new timeout if necessary
        if (typeof newTimeout == "number"){
            $.idleTimer.timeout = newTimeout;
        }
        
        //assign appropriate event handlers
        $(document).bind('mousemove keydown',$.idleTimer.handleUserEvent);
        
        
        //set a timeout to toggle state
        $.idleTimer.tId = setTimeout($.idleTimer.toggleIdleState, $.idleTimer.timeout);
    },
    
    /**
     * Stops the idle timer. This removes appropriate event handlers
     * and cancels any pending timeouts.
     * @return {void}
     * @method stop
     * @static
     */         
    stop: function(){
    
        //set to disabled
        $.idleTimer.enabled = false;
        
        //clear any pending timeouts
        clearTimeout($.idleTimer.tId);
        
        //detach the event handlers
        $(document).unbind('mousemove keydown',$.idleTimer.handleUserEvent);
    }
    
      }; // end of $.idleTimer{}

    

})(jQuery);